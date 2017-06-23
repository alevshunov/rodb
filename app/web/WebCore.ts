import * as express from "express";
import {IncomingMessage} from "http";
import {RoDb} from "../rocore/RoDb";

export class WebCore {
    private roDb: RoDb;

    constructor(roDb: RoDb) {
        this.roDb = roDb;
    }

    public run(port: number = 80): WebCore {
        let me = this;
        let app = express();

        app.set('view engine', 'pug');
        app.set('views', './app/web/www/views');


        this.assignLogging(app);
        this.assignRoutes(app);

        app.listen(port, function () {
            console.log('Example app listening on port ' + port + '!');
        });

        return me;
    }

    private assignLogging(app: any) {
        app.use(function (req: IncomingMessage, res, next) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
            next();
        });

        app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }

    private assignRoutes(app: any) {
        let me = this;

        app.use(function (req: IncomingMessage, res, next) {
            console.log(new Date(), req.url, req.connection.remoteAddress);
            next();
        });

        app.use('/static', express.static('./app/web/www/static'));

        app.get('/', function (req, res) {
            res.render('home', {title: 'RoDb'});
        });

        app.get('/mob/', function (req, res) {
            let mobs = me.roDb.mobs.lookup(req.query.term);
            res.render('mob', {
                title: 'RoDb - Search ' + (req.query.term ? req.query.term : ''),
                description: 'Mob search ' + (req.query.term ? req.query.term : ''),
                mobs: mobs.result,
                hasMore: mobs.hasMore,
                term: req.query.term
            });
        });

        app.get('/mob/:id*', function (req, res) {
            let mob = me.roDb.mobs.getById(req.params.id);
            res.render('mob', {
                title: 'RoDb - ' + (mob ? mob.name : '???'),
                description: (mob ? mob.name : '???'),
                keywords: mob ? ['mob', 'монстр', mob.id, mob.name, mob.sprite, mob.element.name, mob.race.name].join(", ") : '',
                mobs: mob ? [mob] : []
            });
        });

        app.get('/item/', function (req, res) {
            let items = me.roDb.items.lookup(req.query.term);

            res.render('item', {
                title: 'RoDb - Search ' + (req.query.term ? req.query.term : ''),
                description: 'Item search ' + (req.query.term ? req.query.term : ''),
                items: items.result,
                hasMore: items.hasMore,
                term: req.query.term
            });
        });

        app.get('/item/:id*', function (req, res) {
            let item = me.roDb.items.getById(req.params.id);
            res.render('item', {
                title: 'RoDb - ' + (item ? item.fullName : '???'),
                description: (item ? item.fullName : '???'),
                keywords: (item ? ['item', 'вещь', item.id, item.fullName, item.aegisName].join(", ") : ''),
                items: item ? [item] : []
            });
        });
    }
}