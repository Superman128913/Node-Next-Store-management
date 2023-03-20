/** @see https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables */

export const NODE_ENV = process.env.NODE_ENV || 'production';

/** Custom ENV */
export const IS_DEV = NODE_ENV !== 'production';
export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4500';
export const SITE_NAME = process.env.SITE_NAME || 'Store Management System - SaaS';
