// import React, { useContext } from 'react';
// import {Switch, Route, Redirect} from 'react-router-dom'
// import { authRoutes, publicRoutes } from '../routes';
// import { Context } from '..';
// import { observer } from 'mobx-react-lite';

// const AppRouter  q= observer(({user}) => {
//     const {user} = useContext(Context);
//     console.log(user);
//     console.log("isAuth" + user.isAuth);
//     return (
//         <Switch>
//             {user.isAuth === true && authRoutes.map(({path, Component}) =>
//                 <Route key={path} path={path} component={Component} exact/>
//             )}
//             {publicRoutes.map(({path, Component}) =>
//                 <Route key={path} path={path} component={Component} exact/>
//             )}
//         </Switch>
//     )
// })

// export default AppRouter;