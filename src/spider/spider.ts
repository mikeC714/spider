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

	public begin = async() => {
		try{
			await this.crawl.fetch();
		}catch(e){

		}
	};

}

