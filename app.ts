import {RoDb, RoDbLoader} from "./app/rocore/RoDb";
import {WebCore} from "./app/web/WebCore";

class App {
    private roDb:RoDb;
    private webCore: WebCore;

    async run() {
        this.roDb = await new RoDbLoader("./data/").loadDb();
        this.webCore = new WebCore(this.roDb).run(8080);
    }
}

new App().run().catch(console.log.bind(console));