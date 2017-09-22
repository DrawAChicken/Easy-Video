module.exports = (path) => {
    if (!path) return;
    if (path.startsWith('/Uploads/')) {
        return path.replace('/Uploads/', '');
    }
    if (path.startsWith('/npimg.php?pic=')) {
        return 'http://yinghua.yiyire.cn'+path;
    }
    return path;
}