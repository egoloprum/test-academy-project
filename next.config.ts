import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack']
      }
    )

    fileLoaderRule.exclude = /\.svg$/i
    return config
  },
  sassOptions: {
    includePaths: ['/src'],
    prependData: `
      @use "src/shared/styles/colors.scss" as *; 
      @use "src/shared/styles/media.scss" as *;
      @use "src/shared/styles/radius.scss" as *; 
      @use "src/shared/styles/typography.scss" as *;
    `
  }
}

export default nextConfig
