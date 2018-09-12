# domain-crawler

## Introduce
Crawling module to crawl the specific domain.

## Install
``` bash
> npm install --save domain-crawler
```

## Usage/Example
Usage
``` javascript

import crawler from 'domain-crawler';

crawler({domain}, {keyword});
// domain: a domain which you want to crawler
// keyword: a keyword what you want to search in
```

Example
``` javascript
import crawler from 'domain-crawler';

crawler('http://wwww.leehyunggeun.com', /LeeHyungGeun/)
.then((response) => {
    console.log(response); // it will return what it searched in the specific domain, and what it searched out
});
```

## Contributor
Name: LeeHyungGeun
email: lhg4031@gmail.com