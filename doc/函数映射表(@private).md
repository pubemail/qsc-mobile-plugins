# 函数映射表（内部文档）

各平台监听 window.location.href 的改动，其值就是传过来的参数

```javascript
window.location.href = "data:text/qscmobile-msg;base64,这里是一串Base64字符串，解码后就是请求的JSON"
```

## View

- view.card

    收到的参数

    ```javascript
    {
        fn: 'view.card',
        pluginID: 'qiuShiGou',
        args: {title: title, content: content},
        callback: 'QSCMobile110206212797411717474_1377340579820'
    }
    ```

    success:

    ```javascript
    QSCMobile110206212797411717474_1377340579820();
    ```

    error:

    ```javascript
    QSCMobile110206212797411717474_1377340579820({error: 'Error Detail String'});
    ```

## KVDB

- kvdb.set

    收到的参数

    ```javascript
    {
        fn: 'kvdb.set',
        pluginID: 'qiuShiGou',
        args: {key: key, value: 'valueString'},
        callback: 'QSCMobile110206212797411717474_1377340579820'
    }
    ```

    success:

    ```javascript
    QSCMobile110206212797411717474_1377340579820();
    ```

    error:

    ```javascript
    QSCMobile110206212797411717474_1377340579820({error: 'Error Detail String'});
    ```

- kvdb.get

    收到的参数

    ```javascript
    {
        fn: 'kvdb.get',
        pluginID: 'qiuShiGou',
        args: {key: key},
        callback: 'QSCMobile110206212797411717474_1377340579820'
    }
    ```

    success:

    ```javascript
    QSCMobile110206212797411717474_1377340579820('dataString');
    ```

    error:

    ```javascript
    QSCMobile110206212797411717474_1377340579820({error: 'Error Detail String'});
    ```

- kvdb.remove

    收到的参数

    ```javascript
    {
        fn: 'kvdb.remove',
        pluginID: 'qiuShiGou',
        args: {key: key},
        callback: 'QSCMobile110206212797411717474_1377340579820'
    }
    ```

    success:

    ```javascript
    QSCMobile110206212797411717474_1377340579820();
    ```

    error:

    ```javascript
    QSCMobile110206212797411717474_1377340579820({error: 'Error Detail String'});
    ```


- kvdb.clear

    收到的参数

    ```javascript
    {
        fn: 'kvdb.clear',
        pluginID: 'qiuShiGou',
        callback: 'QSCMobile110206212797411717474_1377340579820'
    }
    ```

    success:

    ```javascript
    QSCMobile110206212797411717474_1377340579820();
    ```

    error:

    ```javascript
    QSCMobile110206212797411717474_1377340579820({error: 'Error Detail String'});
    ```

## User

- user.stuid

    收到的参数

    ```javascript
    {
        fn: 'user.stuid',
        pluginID: 'qiuShiGou',
        callback: 'QSCMobile110206212797411717474_1377340579820'
    }
    ```

    success:

    ```javascript
    QSCMobile110206212797411717474_1377340579820('3120100000');
    ```

    error:

    ```javascript
    QSCMobile110206212797411717474_1377340579820({error: 'Error Detail String'});
    ```


- user.pwd

    收到的参数

    ```javascript
    {
        fn: 'user.pwd',
        pluginID: 'qiuShiGou',
        callback: 'QSCMobile110206212797411717474_1377340579820'
    }
    ```

    success:

    ```javascript
    QSCMobile110206212797411717474_1377340579820('123456');
    ```

    error:

    ```javascript
    QSCMobile110206212797411717474_1377340579820({error: 'Error Detail String'});
    ```
