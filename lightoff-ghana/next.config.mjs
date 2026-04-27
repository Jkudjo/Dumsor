import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Repo has lockfiles at root + lightoff-ghana; Vercel builds from app dir — trace from monorepo root.
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
