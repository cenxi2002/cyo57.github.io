function cal(s) {
    var pw30 = (s * 114514 + "").slice(-6)
    var pw60 = (s * 123456 + "").slice(-6)
    var pw90 = (s * 456789 + "").slice(-6)
    var pw120 = (s * 678987 + "").slice(-6)
    var pw999 = ((Number(s) + 3131 - 400) * 7422 + "").slice(-6)
    alert((Number(s) + 3131 - 400) + "\n" + "30分钟: " + pw30 + "\n" + "60min: " + pw60 + "\n" + "90min: " + pw90 + "\n" + "120min: " + pw120 + "\n" + "999min: " +pw999)
}