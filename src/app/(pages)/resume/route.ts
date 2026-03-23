import { getMongoClient } from '@/lib/db/mongo';

const downloadButton = `
<style>
    @media print { .resume-download-btn { display: none !important; } }
    .resume-download-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: #111;
        color: #fff;
        border: none;
        border-radius: 50px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        transition: background 0.2s, transform 0.15s;
    }
    .resume-download-btn:hover { background: #333; transform: translateY(-1px); }
    .resume-download-btn:active { transform: translateY(0); }
    .resume-download-btn svg { width: 16px; height: 16px; fill: currentColor; }
</style>
<button class="resume-download-btn" onclick="window.print()" title="Download as PDF">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
    Download PDF
</button>
`;

function injectButton(html: string): string {
    if (html.includes('</body>')) {
        return html.replace('</body>', `${downloadButton}</body>`);
    }
    return html + downloadButton;
}

export async function GET() {
    try {
        const mongoClient = await getMongoClient();
        const db = mongoClient.db('jayeshpadhiarcom');
        const resumeCollection = db.collection('resume');
        const resume = await resumeCollection.findOne({});

        if (!resume?.html) {
            return new Response('<html><body><p>Resume not available yet.</p></body></html>', {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
            });
        }

        return new Response(injectButton(resume.html), {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    } catch (error) {
        console.error(error);
        return new Response('<html><body><p>Error loading resume.</p></body></html>', {
            status: 500,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }
}
