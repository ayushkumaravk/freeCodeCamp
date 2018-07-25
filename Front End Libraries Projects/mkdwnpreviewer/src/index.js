import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 import marked from 'marked';

//var marked = new require('marked');

var renderer = new marked.Renderer();
//var renderer = new Renderer();
marked.setOptions({
  breaks: true
});

renderer.link = function (href, title, text) {
  return '<a target="_blank" href="' + href + '">' + text + '</a>';
};

//  renderer: renderer

var placeholder = "# Heading 1\n## Heading 2\n### Heading 3\n\n***\n\n#### Dividers:\n" +
                  "***\n---\n<hr/>\n<br/>\n\n***\n\n#### Bold Text:\n**This is bolded text.**\n"+
                  "__Another way to bold.__\n\n***\n\n#### Italic Text:\n*This is italicized text.*\n"+
                  "_Another way to italicize._\n\n***\n\n#### Hyperlink:\n"+
                  "[Google](http://www.google.com)\n\n***\n\n#### Image Example:\n"+
                  "![Isaac Asimov](https://orig00.deviantart.net/74ba/f/2017/050/6/3/spaceship_and_sun__foundation_and_empire__by_tempest790-d8sgo0m.png)\n\n"+
                  "***\n\n#### List Example:\n* Item #1\n* Item #2\n  * Sub-Item #1\n  * Sub-Item #2\n"+
                  "* Item #3\n\n***\n\n#### Blockquote:\n"+
                  "> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n"+
                  "***\n\n#### Inline Code:\nType `git commit -m` at the prompt.\n\n"+
                  "***\n\n#### Code Block:\n```\nvar foo = function (bar) {\n"+
                  "  return bar++;\n};\n\nconsole.log(foo(5));\n```\n";

const textAreaStyles = {
    margin: 0,
    padding: 0
  };

class MarkDownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userInput: placeholder,
      dockLeft: true
    }
    this.handleChange = this.handleChange.bind(this);
//    this.handleEnter = this.handleEnter.bind(this);
    this.imgClick = this.imgClick.bind(this);
  }

  imgClick() {
    let currentdock=this.state.dockLeft;
    this.setState({
      dockLeft: !this.state.dockLeft
    });
    let cont=document.getElementById('container');
    let ltfCont=document.getElementById('left-container');
    let rgtCont=document.getElementById('right-container');
    if (currentdock) {
      cont.setAttribute("style", "flex-direction: column;");
      ltfCont.setAttribute("style", "width: 95%; min-height: 32vh; height: 32vh; padding-top: 2.5vh;");
      rgtCont.setAttribute("style", "width: 95%; min-height: 65vh; height: 65vh;");
    }
    else {
      cont.setAttribute("style", "flex-direction: row;");
      ltfCont.setAttribute("style", "width: 35%; min-height: 95vh; height: 95vh;");
      rgtCont.setAttribute("style", "width: 62%; min-height: 95vh; height: 95vh;");
    }
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  render() {
    return (
      <div id='container'>
        <div id='left-container'>
          <div id='title-bar'>
            <div className='title-bar-text'>EDITOR</div>
            <div className='dock-container'>
              <DisplayImage dockleft = {this.state.dockLeft} onclick = {this.imgClick}/>
            </div>
          </div>
          <GetTextToParse input =  {this.state.userInput}
            handleChange = {this.handleChange}/>
        </div>
        <div id='right-container'>
          <div id='title-bar'>
            <div className='title-bar-text'>PREVIEWER</div>
          </div>
          <ParseMkDown input =  {this.state.userInput} />
        </div>
      </div>
    );
  }
};

class GetTextToParse extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='editor_container'>
        <textarea id='editor'
          onChange={this.props.handleChange}
          value={this.props.input}
          style={textAreaStyles}
          placeholder="Separate Items With Commas" />
      </div>
    );
  }
};

//<div id='preview'>{marked(this.props.input)}
class ParseMkDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='preview_container'>
        <div id='preview' dangerouslySetInnerHTML={{ __html: marked(this.props.input) }} />
      </div>
    );
  }
};

class DisplayImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let tmp_img_file=(this.props.dockleft)?'DockLeft.png':'DockTop.png';
    return (
      <div>
        <img id='img-dockto'
            onClick={this.props.onclick}
            className='img-wrap'
            src={tmp_img_file}
            alt={"Swap docking style"} />
      </div>
    );
  }
};

ReactDOM.render(<MarkDownPreviewer />, document.getElementById('wrapper'));
