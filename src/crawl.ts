import { Queue } from "./queue.ts";

export class Crawl extends Queue{
	url:string;
	key:string;
	concurrent:number;
	private running:number = 0;

	constructor(url:string, key:string, concurrent:number = 1){
		super();
		this.url = url;
		this.key = key;
		this.concurrent = concurrent;
	}
	
	
	fetch = async() => {
		try{
			const res:any = await fetch(this.url)
							.then((res:any) => {
								if(!res.ok){
									process.exit(0);
								}
							});
			await this.crawl(res);
		}catch(e:Error | any){
			this.emit("err", e);
		}
	}

	crawl = async(data:any) => {
		try{
			if(data.length < 0){ 
				this.emit("empty");
				return;
			};

			do{
				//find any url containing the keyword 
				//when the url is found push to queue 
				//causing crawl to continue to run until all urls with keyword are crawled
				this.running++;
			}while(data.length > this.running && this.running < this.concurrent);

		}finally{
			this.running = 0;
			this.crawl(this.queue);
		}
	}
}
