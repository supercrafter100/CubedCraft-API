import fetch from 'node-fetch';



export default
class UUIDCache {

    private static setupBool: boolean;
    private static maxCacheLength: number;
    private static map: Map<string, string>;

    

	/**
	 * Setup the stuff
	 */
	static setup() {
		if(this.setupBool) return;

		//	Config
		this.maxCacheLength = 200;

		//	Dont touch
		this.setupBool = true;
		this.map = new Map();
	}


	/**
	 * Retrieve an UUID from the cache
	 * @param {string} name Get an user's id
	 */
	static async get(user: string) {
		this.setup();

		//	Fast bcs cache
		if(this.map.has(user))
			return this.map.get(user);
		
			
		//	Put in trycatch bcs errors are gay
		let data = null;
		try {
			const MojangUrl = `https://api.mojang.com/users/profiles/minecraft/${user}`
			data = await fetch(MojangUrl).then((res) => res.json());
			data.id = this.convertUUID(data.id);
		}catch(e){
			return '$INVALID';
		}

		//	Adding user and returning data
		this.add(user, data);
		return data;
	}


	/**
	 * Add an uuid to the list
	 * @param {string} user Name of the player
	 * @param {strng} data Target data of the player
	 */
	static add(user: string, data: string) {
		this.setup();

		this.map.set(user, data);
		
		//	Checking cache size
		if(this.map.size > this.maxCacheLength)
			this.deleteOverflow();
	}


	/**
	 * Clear the cache
	 */
	static clear() {
		this.setup();

		this.map.clear();
	}


	//
	//	Utility
	//

	static convertUUID(i: string) {
		this.setup();
		return i.substr(0,8)+"-"+i.substr(8,4)+"-"+i.substr(12,4)+"-"+i.substr(16,4)+"-"+i.substr(20);
	}

	static deleteOverflow() {
		this.map.forEach((_val, key) => {
			if(this.map.size > this.maxCacheLength)
				this.map.delete(key);
		})
	}
}