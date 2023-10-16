// const mdxPlugin = require("@jamshop/eleventy-plugin-mdx");
const EleventyMDX = require("@jamshop/eleventy-plugin-mdx/eleventy-mdx");

module.exports = (eleventyConfig) => {
    // eleventyConfig.addPlugin(mdxPlugin);
    eleventyConfig.addPlugin(myVeryOwnEleventlyPlugin);

    // const eleventyMDX = new EleventyMDX({ includeCDNLinks, components: eleventyConfig.javascriptFunctions });

    // process.env.ELEVENTY_EXPERIMENTAL = "true";
    // eleventyConfig.addTemplateFormats("mdx");

    // eleventyConfig.addExtension("mdx", {
    //     read: false,
    //     data: true,
    //     getData: true,
    //     getInstanceFromInputPath: eleventyMDX.getInstanceFromInputPath,
    //     init: () => { },
    //     compile: eleventyMDX.compile,
    // });

};

function myVeryOwnEleventlyPlugin(eleventyConfig, { includeCDNLinks = false } = {}) {
    const eleventyMDX = new EleventyMDX({
        includeCDNLinks,
        components: eleventyConfig.javascriptFunctions
    });

    process.env.ELEVENTY_EXPERIMENTAL = "true";
    eleventyConfig.addTemplateFormats("mdx");
    eleventyConfig.addExtension("mdx", {
        read: false,
        data: true,
        getData: true,
        getInstanceFromInputPath: eleventyMDX.getInstanceFromInputPath,
        // init: () => { },
        compile: (permalink, inputPath) => {
            const action = eleventyMDX.compile(permalink, inputPath)
            return (props) => {
                console.log(props)
                return action(props);
            }
        },
    });
}
