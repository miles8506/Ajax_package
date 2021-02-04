const ajax = (option) => {
    let extendAjax = {
        mothed: 'get',
        url: '',
        data: {},
        header: {
            type: 'application/x-www-form-urlencoded'
        },
        success: (data) => { },
        error: (data) => { }
    };
    Object.assign(extendAjax, option);
    const xml = new XMLHttpRequest();
    let str = '';
    for (let k in extendAjax.data) {
        str += k + '=' + extendAjax.data[k] + '&';
    };
    str = '?' + str.substr(0, str.length - 1);
    if (extendAjax.mothed == 'post') {
        xml.open(extendAjax.mothed, extendAjax.url);
        xml.setRequestHeader('Content-Type', extendAjax.header.type)
        if (extendAjax.header.type === 'application/json') {
            xml.send(JSON.stringify(extendAjax.data));
        } else {
            xml.send(extendAjax.data);
        };
    } else {
        xml.open(extendAjax.mothed, extendAjax.url + str);
        xml.send();
    };
    xml.onload = () => {
        if (xml.status === 200) {
            if (xml.getResponseHeader('Content-Type').includes('application/json')) {
                extendAjax.success(JSON.parse(xml.responseText));
            } else {
                extendAjax.success(xml.responseText, xml);
            };
        } else {
            extendAjax.error(xml.responseText, xml);
        };
    };
};
