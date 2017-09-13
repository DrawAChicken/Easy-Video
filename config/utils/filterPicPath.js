module.exports = (path) => {
    if (!path) return;
    if (path.startsWith('/Uploads/')) {
        return path.replace('/Uploads/', '');
    }
    if (path.startsWith('/npimg.php?pic=')) {
        return 'http://z.qukansha.com'+path;
    }
    return path;
}