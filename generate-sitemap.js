import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { toolsConfig } from './src/config/toolsConfig.js';

async function buildSitemap() {
  console.log('🚀 [OnyxStack Labs GSC Audit] Starting dynamic sitemap pipeline execution...');
  
  const BASE_URL = 'https://onyxstacklabs.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // 1. Core Static Route Matrix
  const staticRoutes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.9' },
    { path: '/services', changefreq: 'monthly', priority: '0.9' },
    { path: '/projects', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries', changefreq: 'monthly', priority: '0.8' },
    { path: '/portfolio', changefreq: 'monthly', priority: '0.8' },
    { path: '/pricing', changefreq: 'monthly', priority: '0.8' },
    { path: '/careers', changefreq: 'weekly', priority: '0.7' },
    { path: '/contact', changefreq: 'monthly', priority: '0.8' },
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms-conditions', changefreq: 'yearly', priority: '0.3' },
    { path: '/cookies-policy', changefreq: 'yearly', priority: '0.3' },
    { path: '/blog', changefreq: 'daily', priority: '0.8' }
  ];

  let xmlUrlNodes = '';

  staticRoutes.forEach(route => {
    xmlUrlNodes += `\n  <url>\n    <loc>${BASE_URL}${route.path}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`;
  });

  // 1b. Tools Hub + individual tool pages — pulled directly from toolsConfig.js,
  // so any tool added there is automatically included here.
  console.log('🔧 [Tools Sitemap] Building tool page entries from toolsConfig...');
  xmlUrlNodes += `\n  <url>\n    <loc>${BASE_URL}/tools</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;

  toolsConfig
    .filter(tool => tool.status === 'live')
    .forEach(tool => {
      console.log(`🔗 [Tools Sitemap] Mapping tool page: /tools/${tool.slug}`);
      xmlUrlNodes += `\n  <url>\n    <loc>${BASE_URL}/tools/${tool.slug}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    });

  // 2. Verified Production Firebase Configuration Data Matrix
  const explicitConfig = {
    apiKey: "AIzaSyDwpE_nXBS-ptEvf9CsV3Bze5xr-W-oHmI",
    authDomain: "onyxstack-labs.firebaseapp.com",
    projectId: "onyxstack-labs",
    storageBucket: "onyxstack-labs.firebasestorage.app",
    messagingSenderId: "825221965531",
    appId: "1:825221965531:web:ae6684052f998f8c9d8efe"
  };

  try {
    console.log('⚙️ [Firebase Audit] Initializing client application core context layer...');
    const app = initializeApp(explicitConfig);
    console.log('✅ [Firebase Audit] Firebase Client Instance initialized successfully.');

    console.log('🔌 [Firestore Audit] Connecting to Relational Document Storage...');
    const db = getFirestore(app);
    console.log('✅ [Firestore Audit] Cloud Firestore instance wrapper references established.');
    
    // NOTE: field corrected from 'status' == 'LIVE' to 'published' == true —
    // this must match the field the Firestore security rule checks
    // (resource.data.published == true), otherwise Firestore rejects the
    // entire anonymous list query outright, even if matching docs exist.
    console.log('📁 [Firestore Audit] Query Target Validation - Collection target: "blogs" | Parameter published == true');
    const blogCollectionRef = collection(db, 'blogs');
    const liveBlogsQuery = query(blogCollectionRef, where('published', '==', true));
    
    console.log('⏳ [Firestore Audit] Dispatching asynchronous remote connection network frame...');
    const querySnapshot = await getDocs(liveBlogsQuery);
    console.log('✅ [Firestore Audit] Network payload packet received from remote instance storage server.');

    const liveBlogs = [];
    const seenSlugs = new Set();

    querySnapshot.forEach(doc => {
      const blogData = doc.data();
      const slug = blogData.slug;
      
      if (slug && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        
        let lastModDate = currentDate;
        let sortTimestamp = 0;

        if (blogData.updatedAt) {
          const dateObj = blogData.updatedAt.toDate ? blogData.updatedAt.toDate() : new Date(blogData.updatedAt);
          if (!isNaN(dateObj.getTime())) {
            lastModDate = dateObj.toISOString().split('T')[0];
            sortTimestamp = dateObj.getTime();
          }
        }

        console.log(`🔗 [Sitemap Node Push] Mapping valid blog item found: /blog/${slug} (lastmod: ${lastModDate})`);
        liveBlogs.push({
          slug: slug,
          lastmod: lastModDate,
          sortTimestamp: sortTimestamp
        });
      } else if (!slug) {
        console.warn(`⚠️ [Data Validation Failure] Skipping document node (ID: ${doc.id}) - Reason: Property 'slug' is missing/undefined.`);
      }
    });

    console.log(`📊 [Pipeline Inventory Analysis] Total matching "published" documents successfully loaded into RAM: ${liveBlogs.length}`);

    if (liveBlogs.length === 0) {
      console.warn('❌ [Pipeline Threat Analysis] CRITICAL: 0 blog entries processed. Reason: The remote "blogs" collection contains no documents with published == true.');
    } else {
      liveBlogs.sort((a, b) => b.sortTimestamp - a.sortTimestamp);

      liveBlogs.forEach(blog => {
        xmlUrlNodes += `\n  <url>\n    <loc>${BASE_URL}/blog/${blog.slug}</loc>\n    <lastmod>${blog.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
      });
    }

  } catch (firestoreError) {
    console.error("🚨 [FATAL SYSTEM PIPELINE EXCEPTION ERROR]: Cloud Firestore transmission handshake failed entirely.");
    console.error("Error Code Context Trace:", firestoreError.code);
    console.error("Detailed Error Message Object:", firestoreError.message);
    console.error("Full Runtime Stack Trace Below:");
    console.error(firestoreError.stack);
  }

  // 3. Strict XML Compliance Formatting Framework
  const completeSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrlNodes}\n</urlset>`.trim();

  // 4. Output Target Vector Distribution Layer
  const targetDirectories = [
    path.resolve(process.cwd(), 'public', 'sitemap.xml'),
    path.resolve(process.cwd(), 'dist', 'sitemap.xml')
  ];

  targetDirectories.forEach(targetPath => {
    try {
      const dir = path.dirname(targetPath);
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(targetPath, completeSitemapXml, 'utf8');
      console.log(`✅ [File System Write Successful] Map buffer written directly into: ${targetPath}`);
    } catch (writeErr) {
      console.warn(`[File System System Storage Skip]: Directory offset validation failed at ${targetPath}`);
    }
  });
  console.log('🏁 [OnyxStack Labs GSC Audit] Pipeline generation process completed.');
}

buildSitemap();
