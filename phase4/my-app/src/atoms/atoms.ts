import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Task } from '../types/types';

export const tasksGlobal = atomWithStorage<Task[]>("tasks",[]);

export const filterGlobal = atom('');