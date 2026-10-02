import { Queue } from "./queue.ts";


/**
 * Crawl handles majority of the logic for the spider
 *
 * @constuctor
 *
 * @param {string} key - keyword that is desired 
 * @param {number} concurrent - control flow
 * @protected
 * @type {Set} bank - handles storing urls that have already been found 
 * @private
 * @type {number} running - control flow 
 * 
*/

export class Crawl extends Queue{
	key:string;
	concurrent:number;
	protected bank:Set<string> = new Set(); 
	private running:number = 0;

	constructor(key:string, concurrent:number = 1){
		super();
		this.key = key;
		this.concurrent = concurrent;
	}
	

	/**
	 * Fetch the url returning HTML
	 * @param {string} url - url will be used to fetch the HTML content
	 * @return {function} crawl - passing the HTML content to iterate over 
	*/
	
	fetch = async(url:string) => {
		try{
			const res:any = await fetch(url)
							.then((res:any) => {
								if(!res.ok){
									process.exit(0);
								}
							});
			return await this.crawl(res);
		}catch(e:Error | any){
			this.emit("err", e);
		}
	}

	/**
	 * Crawl iterates over HTML content finding any URLs that contain keyword
	 *
	 * once a url is found it is pushed to the queue to be delt with once the HTML data iteration has been complete
	 * if there is anything within the queue the queue is then passed to nest creating a worker 
	 * depending on the amount of urls within the queue will result in the amount of workers spawned 
	*/
	

	crawl = async(data:string) => {
		try{
			if(data.length < 0){ 
				this.emit("empty");
				return;
			};

			// got data length
			// if data reached a certain point 
			// split it across needed amount of worker threads
			// execute concurrent actions there since order doesn't matter
			// but if the limit isn't met just use normal method with the do/while

			do{
				//find any url containing the keyword 
				//when the url is found push to queue 
				//causing crawl to continue to run until all urls with keyword are crawled
				this.running++;
			}while(data.length > this.running && this.running < this.concurrent);

		}finally{
			this.running = 0;
			if(this.queue.length > 0){
				this.nest(this.queue);
			}
		}
	}


	nest = async(urls:Array<string>) => {
		if(urls.length < 0 || !urls) return;
		let workers = [];

		try{
			for(let i = 0; i <= urls.length; i++){
				workers.push(await this.fetch(urls[i] as string));		
			}

			return await Promise.allSettled(workers);
		}catch(e:Error | any){
			process.stdout.write("FAILURE. Failed to create workers.", e);
			process.exit(0);
		};
	}
}
