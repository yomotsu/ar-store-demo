module.exports = {
	build: {
		extend( config, ctx ) {},
		// extractCSS: { allChunks: true },
		postcss: [
			require( 'postcss-flexbugs-fixes' )(),
			require( 'autoprefixer' )( { grid: true } ),
			require( 'css-mqpacker' )(),
			require( 'csswring' )(),
		],
	},
	srcDir: 'client/',
	head: {
		htmlAttrs: { lang: 'ja' },
		bodyAttrs: {},
		titleTemplate: '%s - XR Clothing Store',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Meta description' },
			{ rel: 'stylesheet', href: '/css/index.css' },
		],
	},
	css: [
		{ src: '~assets/scss/main.scss', lang: 'scss' },
	],
}
