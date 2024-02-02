/* eslint-disable max-len */
import axios from 'axios'
import { ApiClass } from '@/api/ApiClass'
import * as process from 'process'

export const BASE_URL = import.meta.env.VITE_API_URL

export const apiV1 = axios.create({
  baseURL: import.meta.env.PROD ? BASE_URL : '/',
  headers: { 'Content-Type': 'application/json' },
})

export const api = new ApiClass(apiV1)
