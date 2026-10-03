import { EventEmitter } from "node:events";
import { Crawl } from "./crawl.ts";
import { Shell } from "./shell.ts";


export class Spider extends EventEmitter{
	private crawl:Crawl;
	private shell:Shell;
	constructor(crawl:Crawl, shell:Shell){
		super();
		this.crawl = crawl;
		this.shell = shell;
	}

	public begin = async(url:string) => {
		try{
			const res = await this.crawl.fetch(url);
			await this.crawl.crawl(res);
		}catch(e){

		}
	};

}

