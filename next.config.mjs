/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async ()=>{
        return [
            {
                source:"/home",
                destination:"/home"
            }
        ]
    }
};

export default nextConfig;
