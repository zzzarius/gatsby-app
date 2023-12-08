const auth = async (clientId, clientSecret) => {
  if (!clientId || !clientSecret) {
    throw new Error('No edx client id or secret provided');
  }

  const url = 'https://courses.edx.org/oauth2/access_token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    token_type: 'jwt',
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
};

const addUrlParams = (url) => {
  const urlObj = new URL(url);
  const searchParams = urlObj.searchParams;
  searchParams.set('exclude_utm', '1');
  searchParams.set('format', 'json');
  searchParams.set('include_hidden_course_runs', '1');

  searchParams.set('omit', 'announcement');
  searchParams.append('omit', 'bannerImageUrl');
  searchParams.append('omit', 'canonical_course_run_key');
  searchParams.append('omit', 'description');
  searchParams.append('omit', 'eligible_for_financial_aid');
  searchParams.append('omit', 'external_key');
  searchParams.append('omit', 'extra_description');
  searchParams.append('omit', 'first_enrollable_paid_seat_price');
  searchParams.append('omit', 'go_live_date');
  searchParams.append('omit', 'instructors');
  searchParams.append('omit', 'license');
  searchParams.append('omit', 'marketing_slug');
  searchParams.append('omit', 'mobile_available');
  searchParams.append('omit', 'modified');
  searchParams.append('omit', 'name');
  searchParams.append('omit', 'original_image');
  searchParams.append('omit', 'reporting_type');
  return urlObj;
}

const getDiscoveryCourseByUUID = async (uuid) => {
  if (!uuid) {
    return null;
  }
  console.log(`Getting course with uuid: ${uuid}`)
  const url = `https://discovery.edx.org/api/v1/courses/${uuid}`;
  const urlObj = addUrlParams(url);
  const accessToken = await auth(process.env.EDX_CLIENT_ID, process.env.EDX_CLIENT_SECRET);
  const response = await fetch(urlObj.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `JWT ${accessToken}`,
    },
  });

  const json = await response.json();
  if (response.ok) {
    return json;
  } else if (response.status === 404) {
    return null;
  } else {
    throw new Error(`HTTP error ${response.status}. ${json?.detail}`);
  }
};

module.exports = {
  getDiscoveryCourseByUUID
}
