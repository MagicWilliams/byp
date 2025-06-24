export async function GET() {
  try {
    const wpApiUrl = 'https://blackyouthproject.com/wp-json/wp/v2/categories';
    const response = await fetch(
      `${wpApiUrl}?per_page=10&orderby=count&order=desc&hide_empty=true`
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch categories' }),
        {
          status: response.status,
        }
      );
    }

    const categories = await response.json();

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
