
# Tally → GitHub Issues (Apps Script)

Free way to receive Tally webhooks and create a GitHub Issue that you can review weekly.

1) Go to https://script.google.com → New project.
2) Add this code (replace placeholders).
3) Deploy → "Web app" → Anyone can access. Copy the URL and paste into Tally's Webhook URL.

```js
const GH_TOKEN = PropertiesService.getScriptProperties().getProperty('GH_TOKEN'); // store in Script Properties
const REPO = 'your-username/your-repo';

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const title = body.data?.Title || 'Submitted Opportunity';
  const url = body.data?.URL || '';
  const country = body.data?.Country || '';
  const deadline = body.data?.Deadline || '';
  const desc = body.data?.Description || '';
  const issue = {
    title: `UGC: ${title}`,
    body: `URL: ${url}\nCountry: ${country}\nDeadline: ${deadline}\n\n${desc}`
  };
  const res = UrlFetchApp.fetch(`https://api.github.com/repos/${REPO}/issues`, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `token ${GH_TOKEN}`, 'User-Agent': 'apps-script' },
    payload: JSON.stringify(issue)
  });
  return ContentService.createTextOutput('ok');
}
```

4) In GitHub, create a classic personal access token (scopes: `repo` for private or `public_repo` for public) and paste it into Script Properties as `GH_TOKEN`.
5) In Tally, create fields: Title, URL, Country, Deadline, Description. Set the webhook to your web app URL.
6) Each submission becomes a GitHub Issue you can review weekly and convert into a Markdown file.
