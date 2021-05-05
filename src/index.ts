//
// Dependencies
//
import express from 'express';
const app = express();

//
// Route handlers
//

import TopGuildsRoute from './routes/StatsRoutes/TopGuildsRoute';
import UserInfoRoute from './routes/StatsRoutes/UserInfoRoute';

import LoginRoute from './routes/SkriptRoutes/LoginRoute';
import SelectServerRoute from './routes/SkriptRoutes/SelectServerRoute';
import SetMotdRoute from './routes/SkriptRoutes/SetMotdRoute';

//
// Routes
// 

app.get('/topguilds', async (req, res) => res.send(await TopGuildsRoute(req)));
app.get('/user/:user', async (req, res) => res.json(await UserInfoRoute(req)));

app.get('/api/login', async (req, res) => res.send(await LoginRoute(req)));
app.get('/api/selectserver', async (req, res) => res.send(await SelectServerRoute(req)));
app.get('/api/setmotd', async (req, res) => res.send(await SetMotdRoute(req)));

//
// Exporting app stuff
//

export default app;