import crawler from './crawler';

const seed = 'http://www.leehyunggeun.com/';
crawler(seed, /LeeHyungGeun/i)
.then((result) => {
    console.log(result);
});