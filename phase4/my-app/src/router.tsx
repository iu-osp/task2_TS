import {FC} from "react";
import {createBrowserRouter, RouteObject} from "react-router";
import { TaskList } from "./components/TaskList";
import { AddTask } from "./components/AddTask";
import { DeleteTask } from "./components/DeleteTask";
import { TaskItemPage } from "./components/TaskItemPage";

const path = (path: string, Page: FC): RouteObject => ({
    path: path,
    element: <Page />,
})

export const router = createBrowserRouter([
    {
        path: '/',
        element: <TaskList />,
    },
    {path:'/addT',element:<AddTask/>},
    {path:'/deleteT',element:<DeleteTask/>},
    {path:'/:id',element:<TaskItemPage/>}
])