import { getMongoClient } from '@/lib/db/mongo';

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

        return new Response(resume.html, {
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
