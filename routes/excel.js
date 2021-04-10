var router = require('express').Router()

const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
var upload = require('./api/multer')
var pool = require('./api/pool')

// -> Express Upload RestAPIs for Product
router.post('/uploadfileProduct', upload.single('s_no'), (req, res) => {
    console.log('req.file.......', req.file)
    console.log('req.body........', req.body);

    importExcelData2MySQLPr('public/images/' + req.file.filename, req);
    res.json({
        'msg': 'File uploaded/import successfully!',
        'file': req.file
    });
});

// -> Import Excel Data to MySQL database
function importExcelData2MySQLPr(filePath, req) {
    console.log("importExcelData2MySQ");

    // File path.
    readXlsxFile(filePath).then((rows) => {
        console.log(rows);
        rows.shift(); // shift() removes 1st item (header row)
        // let Rlength = rows.length
        // console.log('Rlengthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',Rlength);
        // console.log(rows);

        // var newestRow = [] ;

        // var newRow =  rows.slice(-1)[0]
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaagyanewRow',newRow);
        // newestRow.push(newRow)
        var qry = ''
        rows.map(item => {
            qry = `INSERT INTO inventory(unit,s_no,productid) VALUES(${req.body.unit},'${item}',${req.body.productid});`
            pool.query(qry, (error, response) => {
                console.log('error//response', error || response);
                // let query = 'update inventory se where inventoryid=?';
                // pool.query(query, [rows ,req.body.inventoryid], (error, response) => {
                //     console.log(error || response);
            });
        })


    })

}

// -> Express Upload RestAPIs for GAME
router.post('/uploadfileGAME', upload.single('s_no'), (req, res) => {
    console.log('req.file.......', req.file)
    console.log('req.body........', req.body);

    importExcelData2MySQLGm('public/images/' + req.file.filename, req);
    res.json({
        'msg': 'File uploaded/import successfully!',
        'file': req.file
    });
});

// -> Import Excel Data to MySQL database
function importExcelData2MySQLGm(filePath, req) {
    console.log("importExcelData2MySQ");

    // File path.
    readXlsxFile(filePath).then((rows) => {
        console.log(rows);
        rows.shift(); // shift() removes 1st item (header row)
        // let Rlength = rows.length
        // console.log('Rlengthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',Rlength);
        // console.log(rows);

        // var newestRow = [] ;

        // var newRow =  rows.slice(-1)[0]
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaagyanewRow',newRow);
        // newestRow.push(newRow)
        var qry = ''
        rows.map(item => {
            qry = `INSERT INTO inventory(unit,s_no,gameid) VALUES(${req.body.unit},'${item}',${req.body.gameid});`
            pool.query(qry, (error, response) => {
                console.log('error//response', error || response);
               
            });
        })


    })

}

// // -> Express Upload RestAPIs for ACCESSORIES

router.post('/uploadfileaccessoriesid', upload.single('s_no'), (req, res) => {
    console.log('req.file.......', req.file)
    console.log('req.body........', req.body);

    importExcelData2MySQLAc('public/images/' + req.file.filename, req);
    res.json({
        'msg': 'File uploaded/import successfully!',
        'file': req.file
    });
});

// -> Import Excel Data to MySQL database
function importExcelData2MySQLAc(filePath, req) {
    console.log("importExcelData2MySQ");

    // File path.
    readXlsxFile(filePath).then((rows) => {
        console.log(rows);
        rows.shift(); // shift() removes 1st item (header row)
        // let Rlength = rows.length
        // console.log('Rlengthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',Rlength);
        // console.log(rows);

        // var newestRow = [] ;

        // var newRow =  rows.slice(-1)[0]
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaagyanewRow',newRow);
        // newestRow.push(newRow)
        var qry = ''
        rows.map(item => {
            qry = `INSERT INTO inventory(unit,s_no,accessoriesid) VALUES(${req.body.unit},'${item}',${req.body.accessoriesid});`
            pool.query(qry, (error, response) => {
                console.log('error//response', error || response);
                // let query = 'update inventory se where inventoryid=?';
                // pool.query(query, [rows ,req.body.inventoryid], (error, response) => {
                //     console.log(error || response);
            });
        })


    })

}



module.exports = router