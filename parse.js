const fs = require('fs');

const printType = {
    CLASS: "class",
    METHOD: "method",
    START: "Not Started"
}

let state = printType.START

fs.readFile('./documentation.json', 'utf8', (err,data) => {
    if (err) {
        console.log(err)
    } else {
        data = JSON.parse(data)
        fs.writeFileSync('./output.rtf', fs.readFileSync('./introText.rtf', 'utf8'))
        data.forEach(item => {
            if (!item.undocumented) {
                let data = ""

                if (item.kind == "class") {
                    data += getClassText(item)
                    state = printType.CLASS
                } else if (item.kind == "function") {
                    if (state == printType.CLASS) {
                        data += getMethodTitle()
                    }
                    state = printType.METHOD
                    data += getMethod(item)
                }

                fs.appendFileSync('./output.rtf', data)
            }
        });
        fs.appendFileSync('./output.rtf', fs.readFileSync('./endText.rtf', 'utf8'))
    }
})

function getClassText(item) {
    let text = ""
    text += `{\\rtlch\\fcs1 \\af31506\\afs72\\n \\ltrch\\fcs0 \\f31506\\fs72\\insrsid622561\\charrsid622561 Class }{\\rtlch\\fcs1 \\af31506\\afs72 \\ltrch\\fcs0 \\f31506\\fs72\\insrsid7412641 `+ item.longname +`}{\\rtlch\\fcs1 \\af31506\\afs72 \\ltrch\\fcs0 \\f31506\\fs72\\insrsid6509224\\charrsid622561\\par }`
    text += `{\\rtlch\\fcs1 \\af31506\\afs40 \\ltrch\\fcs0 \\f31506\\fs40\\insrsid7412641 ` + getFuctionText(item) + `}{\\rtlch\\fcs1 \\af0 \\ltrch\\fcs0 \\insrsid8341615\\charrsid8341615  }{\\rtlch\\fcs1 \\af31506\\afs40 \\ltrch\\fcs0 \\f31506\\fs40\\insrsid622561\\charrsid622561 \\par }`
    text += `{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid622561 ` + item.classdesc + `}{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid1647523\\charrsid2324198 \\par }`
    text += `\\pard \\ltrpar\\s17\\ql \\li0\\ri0\\keepn\\nowidctlpar\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid10696056 {\\rtlch\\fcs1 \\af31506\\afs40 \\ltrch\\fcs0 \\f31506\\fs40\\insrsid622561\\charrsid622561 Constructor}{\\rtlch\\fcs1 \\af31506\\afs40 \\ltrch\\fcs0 \\f31506\\fs40\\insrsid1647523\\charrsid1647523 \\par }`
    text += `\\pard \\ltrpar\\s17\\ql \\li0\\ri0\\keep\\keepn\\nowidctlpar\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid10696056 {\\rtlch\\fcs1 \\af31506\\afs36 \\ltrch\\fcs0 \\f31506\\fs36\\insrsid622561\\charrsid8224647 new ` + getFuctionText(item) + `}{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid8341615\\charrsid8341615  }{\\rtlch\\fcs1 \\af31506\\afs36 \\ltrch\\fcs0 \\f31506\\fs36\\insrsid622561\\charrsid8224647 \\par }`
    text += getMethodMinusIntro(item)
    return text
}

function getMethod(item) {
    let text = ""
    text += `\\pard \\ltrpar\\s17\\ql \\li0\\ri0\\keep\\keepn\\nowidctlpar\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid2360155 {\\rtlch\\fcs1 \\af31506\\afs36 \\ltrch\\fcs0 \\f31506\\fs36\\insrsid4598723\\charrsid8224647 `+ getFuctionText(item) +`}{\\rtlch\\fcs1 \\af0 \\ltrch\\fcs0 \\insrsid4598723\\charrsid16320366\\par }`
    text += getMethodMinusIntro(item)
    return text
    
}

function getMethodMinusIntro(item) {
    let text = ""
    text += `{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid4598723\\charrsid4598723 `+ item.description +`}{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid3367493 \\par }`
    if (item.params.length != 0) {
        text += `\\pard \\ltrpar\\s17\\ql \\li0\\ri0\\sb240\\keep\\keepn\\nowidctlpar\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid2360155 {\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0 \\f31506\\fs28\\insrsid3367493 Parameters \\par \\ltrrow}`
        text += `\\trowd \\irow0\\irowband-1\\ltrrow\\ts29\\trgaph108\\trleft-108\\trbrdrt\\brdrs\\brdrw10\\brdrcf19 \\trbrdrl\\brdrs\\brdrw10\\brdrcf19 \\trbrdrb\\brdrs\\brdrw10\\brdrcf19 \\trbrdrr\\brdrs\\brdrw10\\brdrcf19 \\trbrdrh\\brdrs\\brdrw10\\brdrcf19 \\trftsWidth1\\trftsWidthB3\\trautofit1\\trpaddl108\\trpaddr108\\trpaddfl3\\trpaddft3\\trpaddfb3\\trpaddfr3\\tscbandsh1\\tscbandsv1\\tblrsid10373000\\tbllkhdrrows\\tbllkhdrcols\\tbllknocolband\\tblind0\\tblindtype3 \\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf21 \\clbrdrl\\brdrs\\brdrw10\\brdrcf21 \\clbrdrb\\brdrs\\brdrw10\\brdrcf21 \\clbrdrr\\brdrtbl \\clcbpat21\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw21 \\cellx3134\\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf21 \\clbrdrl\\brdrtbl \\clbrdrb\\brdrs\\brdrw10\\brdrcf21 \\clbrdrr\\brdrtbl \\clcbpat21\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw21 \\cellx6376\\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf21 \\clbrdrl\\brdrtbl \\clbrdrb\\brdrs\\brdrw10\\brdrcf21 \\clbrdrr\\brdrs\\brdrw10\\brdrcf21 \\clcbpat21\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw21 \\cellx9618\\pard\\plain \\ltrpar\\s17\\ql \\li0\\ri0\\keep\\keepn\\nowidctlpar\\intbl\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\pararsid10696056\\tscfirstrow\\tscfirstcol\\yts29 \\rtlch\\fcs1 \\ab\\af0\\afs24\\alang1025 \\ltrch\\fcs0 \\b\\fs24\\cf22\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid3367493 Name\\cell }\\pard\\plain \\ltrpar\\s17\\ql \\li0\\ri0\\keep\\keepn\\nowidctlpar\\intbl\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\pararsid10696056\\tscfirstrow\\yts29 \\rtlch\\fcs1 \\ab\\af0\\afs24\\alang1025 \\ltrch\\fcs0 \\b\\fs24\\cf22\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid3367493 Type\\cell }\\pard\\plain \\ltrpar\\s17\\ql \\li0\\ri0\\keep\\keepn\\nowidctlpar\\intbl\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\pararsid10696056\\tscfirstrow\\yts29 \\rtlch\\fcs1 \\ab\\af0\\afs24\\alang1025 \\ltrch\\fcs0 \\b\\fs24\\cf22\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid3367493 Description\\cell }`
        item.params.forEach((param, index) => {
            text += `\\pard\\plain \\ltrpar             \\ql \\li0\\ri0\\nowidctlpar\\intbl\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0 \\rtlch\\fcs1 \\af0\\afs22\\alang1025 \\ltrch\\fcs0 \\fs22\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0              \\f31506\\fs28\\insrsid622561 \\trowd \\irow0\\irowband-1\\ltrrow\\ts29\\trgaph108\\trleft-108\\trbrdrt\\brdrs\\brdrw10\\brdrcf19 \\trbrdrl\\brdrs\\brdrw10\\brdrcf19 \\trbrdrb\\brdrs\\brdrw10\\brdrcf19 \\trbrdrr\\brdrs\\brdrw10\\brdrcf19 \\trbrdrh\\brdrs\\brdrw10\\brdrcf19              \\trftsWidth1\\trftsWidthB3\\trautofit1\\trpaddl108\\trpaddr108\\trpaddfl3\\trpaddft3\\trpaddfb3\\trpaddfr3\\tscbandsh1\\tscbandsv1\\tblrsid10373000\\tbllkhdrrows\\tbllkhdrcols\\tbllknocolband\\tblind0\\tblindtype3 \\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf21 \\clbrdrl             \\brdrs\\brdrw10\\brdrcf21 \\clbrdrb\\brdrs\\brdrw10\\brdrcf21 \\clbrdrr\\brdrtbl \\clcbpat21\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw21 \\cellx3134\\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf21 \\clbrdrl\\brdrtbl \\clbrdrb\\brdrs\\brdrw10\\brdrcf21 \\clbrdrr\\brdrtbl              \\clcbpat21\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw21 \\cellx6376\\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf21 \\clbrdrl\\brdrtbl \\clbrdrb\\brdrs\\brdrw10\\brdrcf21 \\clbrdrr\\brdrs\\brdrw10\\brdrcf21 \\clcbpat21\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw21              \\cellx9618\\row \\ltrrow}\\trowd \\irow1\\irowband0\\lastrow \\ltrrow\\ts29\\trgaph108\\trleft-108\\trbrdrt\\brdrs\\brdrw10\\brdrcf19 \\trbrdrl\\brdrs\\brdrw10\\brdrcf19 \\trbrdrb\\brdrs\\brdrw10\\brdrcf19 \\trbrdrr\\brdrs\\brdrw10\\brdrcf19 \\trbrdrh\\brdrs\\brdrw10\\brdrcf19              \\trftsWidth1\\trftsWidthB3\\trautofit1\\trpaddl108\\trpaddr108\\trpaddfl3\\trpaddft3\\trpaddfb3\\trpaddfr3\\tscbandsh1\\tscbandsv1\\tblrsid10373000\\tbllkhdrrows\\tbllkhdrcols\\tbllknocolband\\tblind0\\tblindtype3 \\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf19 \\clbrdrl             \\brdrs\\brdrw10\\brdrcf19 \\clbrdrb\\brdrs\\brdrw10\\brdrcf19 \\clbrdrr\\brdrtbl \\clcbpat20\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw20 \\cellx3134\\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf19 \\clbrdrl\\brdrtbl \\clbrdrb\\brdrs\\brdrw10\\brdrcf19 \\clbrdrr\\brdrtbl              \\clcbpat20\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw20 \\cellx6376\\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf19 \\clbrdrl\\brdrtbl \\clbrdrb\\brdrs\\brdrw10\\brdrcf19 \\clbrdrr\\brdrs\\brdrw10\\brdrcf19 \\clcbpat20\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw20              \\cellx9618                          \\pard\\plain \\ltrpar\\s17\\ql \\li0\\ri0\\keep\\keepn\\nowidctlpar\\intbl\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\pararsid10696056\\tscfirstcol\\tscbandhorzodd\\yts29 \\rtlch\\fcs1 \\ab\\af0\\afs24\\alang1025 \\ltrch\\fcs0              \\b\\fs24\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid3367493 `+ param.name +`}{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid3367493 \\cell }\\pard\\plain \\ltrpar\\s17\\ql \\li0\\ri0\\keep\\keepn\\nowidctlpar\\intbl\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\pararsid10696056\\tscbandhorzodd\\yts29 \\rtlch\\fcs1 \\af0\\afs24\\alang1025 \\ltrch\\fcs0 \\fs24\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid3367493 `+ param.type.names[0] +`}{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid3367493 \\cell }\\pard\\plain \\ltrpar \\s17\\ql \\li0\\ri0\\keep\\keepn\\nowidctlpar\\intbl\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\pararsid10696056\\tscbandhorzodd\\yts29 \\rtlch\\fcs1 \\af0\\afs24\\alang1025 \\ltrch\\fcs0 \\fs24\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid622561\\charrsid3367493 `+ param.description +`}{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0              \\f31506\\insrsid622561\\charrsid3367493 \\cell }`
        })
        text += `\\pard\\plain \\ltrpar\\ql \\li0\\ri0\\nowidctlpar\\intbl\\wrapdefault\\aspalpha\\aspnum\\faauto\\adjustright\\rin0\\lin0 \\rtlch\\fcs1 \\af0\\afs22\\alang1025 \\ltrch\\fcs0 \\fs22\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0 \\f31506\\fs28\\insrsid3367493 \\trowd \\irow1\\irowband0\\lastrow \\ltrrow\\ts28\\trgaph108\\trleft-108\\trbrdrt\\brdrs\\brdrw10\\brdrcf19 \\trbrdrl\\brdrs\\brdrw10\\brdrcf19 \\trbrdrb\\brdrs\\brdrw10\\brdrcf19 \\trbrdrr\\brdrs\\brdrw10\\brdrcf19 \\trbrdrh\\brdrs\\brdrw10\\brdrcf19 \\trbrdrv\\brdrs\\brdrw10\\brdrcf19 \\trftsWidth1\\trftsWidthB3\\trautofit1\\trpaddl108\\trpaddr108\\trpaddfl3\\trpaddft3\\trpaddfb3\\trpaddfr3\\tscbandsh1\\tscbandsv1\\tblrsid10373000\\tbllkhdrrows\\tbllkhdrcols\\tbllknocolband\\tblind0\\tblindtype3 \\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf19 \\clbrdrl\\brdrs\\brdrw10\\brdrcf19 \\clbrdrb\\brdrs\\brdrw10\\brdrcf19 \\clbrdrr\\brdrs\\brdrw10\\brdrcf19 \\clcbpat20\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw20 \\cellx3134\\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf19 \\clbrdrl\\brdrs\\brdrw10\\brdrcf19 \\clbrdrb\\brdrs\\brdrw10\\brdrcf19 \\clbrdrr\\brdrs\\brdrw10\\brdrcf19 \\clcbpat20\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw20 \\cellx6376\\clvertalt\\clbrdrt\\brdrs\\brdrw10\\brdrcf19 \\clbrdrl\\brdrs\\brdrw10\\brdrcf19 \\clbrdrb\\brdrs\\brdrw10\\brdrcf19 \\clbrdrr\\brdrs\\brdrw10\\brdrcf19 \\clcbpat20\\cltxlrtb\\clftsWidth3\\clwWidth3242\\clcbpatraw20 \\cellx9618\\row }`
    }
    text += `\\pard\\plain \\ltrpar\\s17\\ql \\li0\\ri0\\sb240\\keep\\nowidctlpar\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid10696056 \\rtlch\\fcs1 \\af0\\afs24\\alang1025 \\ltrch\\fcs0 \\fs24\\lang1033\\langfe1033\\cgrid\\langnp1033\\langfenp1033 {\\rtlch\\fcs1 \\af31506\\afs32 \\ltrch\\fcs0 \\f31506\\fs32\\insrsid3367493\\charrsid3367493 Source }{\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0 \\f31506\\fs28\\insrsid3367493 \\endash  }{\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0 \\f31506\\fs28\\insrsid3367493 `+ item.meta.filename +`}{\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0 \\f31506\\fs28\\insrsid3367493 , line }{\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0 \\f31506\\fs28\\insrsid3367493 `+ item.meta.lineno +`}{\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0 \\f31506\\fs28\\insrsid3367493 \\par }`

    if (item.returns) {
        text += `\\pard \\ltrpar\\s17\\ql \\li0\\ri0\\sb240\\keep\\nowidctlpar\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid2360155 {\\rtlch\\fcs1 \\af31506\\afs32 \\ltrch\\fcs0 \\f31506\\fs32\\insrsid7887817\\charrsid16197946 Returns -> }{\\rtlch\\fcs1 \\af31506\\afs28 \\ltrch\\fcs0 \\f31506\\fs28\\insrsid7887817\\charrsid7887817 `+item.returns[0].description+`}{\\rtlch\\fcs1 \\af31506 \\ltrch\\fcs0 \\f31506\\insrsid7887817\\charrsid7887817 \\par }`
    }
    return text
}

function getMethodTitle() {
    return `\\pard \\ltrpar\\s17\\ql \\li0\\ri0\\sb600\\keepn\\nowidctlpar\\wrapdefault\\faauto\\adjustright\\rin0\\lin0\\itap0\\pararsid2360155 {\\rtlch\\fcs1 \\af31506\\afs40 \\ltrch\\fcs0 \\f31506\\fs40\\insrsid3367493\\charrsid3367493 Methods}{\\rtlch\\fcs1 \\af31506\\afs40 \\ltrch\\fcs0 \\f31506\\fs40\\insrsid3367493 \\par }`
}

function getFuctionText(item) {
    let baseText = item.name + "("
    item.meta.code.paramnames.forEach((param, index) => {
        baseText += param
        if (index == item.meta.code.paramnames.length - 1) {
            baseText += ")"
        } else {
            baseText += ", "
        }
    })
    if (item.meta.code.paramnames.length == 0) {
        baseText += ")"
    }
    return baseText
}