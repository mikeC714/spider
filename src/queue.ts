import { EventEmitter } from "node:events";


export class Queue extends EventEmitter{
	protected queue:Array<string> = [];	
	constructor(){
		super();
		this.init();
	}

	init = () => {
		this.on("push", (url:string) => this.queue.push(url));
		this.on("flush", () => {
			if(this.queue.length > 0){
				const data = this.queue;
				this.queue = [];
				return data;
			}
		});
		this.on("empty", () => {
			process.stdout.write("Crawling finished");
		})
	}

	parse = () => {}
	flush = () => {}
}
