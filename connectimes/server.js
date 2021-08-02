var express = require('express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var post_TagRouter = require("./routes/Post_TagRout");
var post_ConnectionRouter = require("./routes/Post_ConnectionRout");
var saveTagRouter = require("./routes/saveTagRout");
var saveConnectionRouter = require("./routes/saveConnectionRout");
var categoryRouter = require("./routes/categoryRout");
var Keyword = require("./routes/keywordRout");
var fileuploadRouter = require("./routes/UploadRout");
var usersRouter = require("./routes/UsersRout");
var getAddressRouter = require("./routes/GetAddressRout");
var callIntroduceRouter = require("./routes/callIntroduceRout");
var callPostRouter = require("./routes/callPostRout");
var callCommentRouter = require("./routes/callCommentRout");
var MailRout = require("./routes/MailRout");
var submitClickRout = require("./routes/submitClickRout");
var submitClickRout2 = require("./routes/submitClickRout2");
var callTopTagRout = require("./routes/callTopTagRout");
var textOnlyPostingRout = require("./routes/textOnlyPostingRout");
var writeHiddenRout = require("./routes/writeHiddenRout");
var callbloginfoRout = require("./routes/callbloginfoRout");
var commentPostingRout = require("./routes/commentPostingRout");
var re_commentPostingRout = require("./routes/re_commentPostingRout");
var callRe_commentListRout = require("./routes/callRe_commentListRout");
var callcommentlistRout = require("./routes/callcommentlistRout");
var followCheckRout = require("./routes/followCheckRout");
var followClickRout = require("./routes/followClickRout");
var tagGroupElementRout = require("./routes/tagGroupElementRout");

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/Post_Tag", post_TagRouter);
app.use("/api/Post_Connection", post_ConnectionRouter);
app.use("/api/saveTag", saveTagRouter);
app.use("/api/saveConnection", saveConnectionRouter);
app.use("/api/Category", categoryRouter);
app.use("/api/Keyword", Keyword);
app.use("/api/upload", fileuploadRouter);
app.use(express.static("./uploads"));
app.use("/api/register", usersRouter);
app.use("/api/LoginForm", usersRouter);
app.use("/api/getAddress", getAddressRouter);
app.use("/api/callIntroduce", callIntroduceRouter);
app.use("/api/callPost", callPostRouter);
app.use("/api/callComment", callCommentRouter);
app.use("/api/mail", MailRout);
app.use("/api/submitClick", submitClickRout);
app.use("/api/submitClick2", submitClickRout2);
app.use("/api/calltoptag", callTopTagRout);
app.use("/api/textonlyposting", textOnlyPostingRout);
app.use("/api/writehidden", writeHiddenRout);
app.use("/api/callbloginfo", callbloginfoRout);
app.use("/api/commentPosting", commentPostingRout);
app.use("/api/re_commentPosting", re_commentPostingRout);
app.use("/api/callre_commentlist", callRe_commentListRout);
app.use("/api/callcommentlist", callcommentlistRout);
app.use("/api/followCheck", followCheckRout);
app.use("/api/followClick", followClickRout);
app.use("/api/tagGroupElement", tagGroupElementRout);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));