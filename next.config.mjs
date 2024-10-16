/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // {
      //   source: '/:path*',
      //   destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      // },
      {
        source: '/account',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/account`,
      },
      // {
      //   source: '/account/:path*',
      //   destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/:path*`,
      // },
    ]
  }
}

export default nextConfig
