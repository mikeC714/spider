import { Spider } from "./spider/spider.ts";
import { Crawl } from "./spider/crawl.ts";
import { Shell } from "./spider/shell.ts";



async function main(){
	const url = process.argv[1];
	const keyWord = process.argv[2]; 
	const concurrency = process.argv[3];

	if(url === undefined || keyWord === undefined || !concurrency === undefined){
		process.stdout.write("Failed to provide needed arguments.");
		process.exit(0);
	}

	const shell = new Shell();	
	const crawl = new Crawl(keyWord, Number(concurrency));
	const spider = new Spider(crawl, shell);


	await spider.begin(url);
	spider.on("done", (time:number | string) => {
		process.stdout.write(`Task finished took ${time}`);
		process.exit(0);
	});
};





