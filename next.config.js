module.exports = {
	env: {
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		SITE_DOMAIN:
			process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.LOCAL_SITE_DOMAIN,
	},
};
