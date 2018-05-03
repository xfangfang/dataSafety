import React, { Component } from 'react';
import './App.css';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Button} from 'antd';
import { Select } from 'antd';
import 'antd/dist/antd.css';

const Option = Select.Option;
const { TextArea } = Input;


class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          haskey:true,
          intext:"",
          key:"",
          outtext:"",
          type:"1",
      }
  }

  vigeneer(strin,key,encode){
      let input=strin.replace(/\s/g, "").toUpperCase()
      let password = key.replace(/\s/g, "").toUpperCase()
      let A = 65
      let output = ""
      for (var char in input) {
          let inc = input.charCodeAt(char)-A;
          let start = (password.charCodeAt(char%password.length)-A)
          var ans ="";
          if (encode) {
              ans = String.fromCharCode((start+inc)%26+A)
          } else {
              ans = inc-start
              ans = ans<0?ans+26:ans
              ans = String.fromCharCode((ans)%26+A)
          }
          output += ans
      }
      return output
  }
  /**
  *nope 为未使用参数，统一样式使测试更加方便
  */
  twoPath(strin,nope,encode){
      let a = strin.replace(/\s/g, "").split("")
      if(encode){
          return a.reduce((acc,value,index) => index%2?acc:acc+value ,"") +
          a.reduce((acc,value,index) => index%2?acc+value:acc ,"")
      }else{
          let ans = [];
          for (var i = 0; i < a.length; i++) {
              if(i < a.length/2){
                  ans[i+i] = a[i]
              }
              else {
                  ans[i+i-a.length+!(a.length%2)] = a[i]
              }
          }
          ans = ans.join("")
          return ans
      }

  }
  //将相同的密钥去掉了，多余补#
  keyControl(strin,key,encode){
      let a = strin.replace(/\s/g, "").split("")
      let b = key.replace(/\s/g, "").split("")

      //check key
      b = Array.from(new Set(b))


      //创建矩阵
      let c = []
      let len = Math.ceil(a.length/b.length)
      for (let i = 0; i < len; i++) {
          c[i] = []
      }
      //密钥的一个字符
      function KeyChar(index,char){
          let obj = {};
          obj.index = index
          obj.char = char
          obj.rindex = index
          return obj
      }
      //填充矩阵
      let x=0,y=0;
      for (let i = 1; i <= a.length; i++) {
          c[x][y] = a[i-1]
          if(encode){
              y++
              if(i%b.length===0){
                  x++
                  y=0
              }
          }else{
              x++
              if(i%len===0){
                  x=0
                  y++
              }
          }

      }


      //生成keys
      let keys = []
      for(let i=0;i<b.length;i++){
          keys[i] = KeyChar(i,b[i])
      }

      keys.sort(function(a, b){
          return a.char > b.char
      });
      if(!encode){
          for (let i=0;i<keys.length;i++) {
              keys[i].rindex = i
          }
          keys.sort(function(a, b){
              return a.index > b.index
          });
      }


      let ans = ""
      if(encode){
          for(let i=0;i<keys.length;i++){
              for(let j=0;j<len;j++){
                  if(c[j][keys[i].index]){
                      ans += c[j][keys[i].index]
                  }else{
                      ans += '#'
                  }
              }
          }
      }else{
          for(let i=0;i<len;i++){
              for(let j=0;j<b.length;j++){
                  if(c[i][keys[j].rindex]){
                      ans += c[i][keys[j].rindex]
                  }else{
                      ans += '#'
                  }
              }
          }
      }

      return ans
  }

  handleChange = (value) => {
    switch (value) {
        case "1":
          this.setState({haskey:true})
            break;
        case "2":
          this.setState({haskey:false})
            break;
        case "3":
          this.setState({haskey:true})
            break;
        default:
    }
    this.setState({
        type:value
    })
  }

  en = () => {
      var ans = ""
      switch (this.state.type) {
          case "1":
            ans = this.vigeneer(this.state.intext,this.state.key,true)
              break;
          case "2":
            ans = this.twoPath(this.state.intext,this.state.key,true)
              break;
          case "3":
            ans = this.keyControl(this.state.intext,this.state.key,true)
              break;
          default:
      }
      this.setState({
          outtext:ans
      })
  }

  de = () => {
      var ans = ""
      switch (this.state.type) {
          case "1":
            ans = this.vigeneer(this.state.outtext,this.state.key,false)
              break;
          case "2":
            ans = this.twoPath(this.state.outtext,this.state.key,false)
              break;
          case "3":
            ans = this.keyControl(this.state.outtext,this.state.key,false)
              break;
          default:
      }
      this.setState({
          intext:ans
      })
  }

  onOutChange = (e) => {
      this.setState({
          outtext:e.target.value
      })
  }
  onInChange = (e) => {
      this.setState({
          intext:e.target.value
      })
  }
  onKeyChange = (e) => {
      this.setState({
          key:e.target.value
      })
  }

  render() {
    return (
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">信息安全基础作业 方悦成 20154409</h1>
        </header>
        <Row  >
          <Col span={4} />
          <Col span={16} align={"bottom"} >
                <Row type={"flex"} align={"middle"} >
                    <Col span={11}>
                        <TextArea
                            rows={5}
                            placeholder="明文"
                            style={{ margin: '24px 0' }}
                            value={this.state.intext}
                            onChange={this.onInChange}
                        />
                    </Col>
                    <Col span={2} >

                    </Col>
                    <Col span={11} >

                      <Select
                        defaultValue={this.state.type}
                        style={{ width: 120 }}
                        onChange={this.handleChange}>

                        <Option value="1">Vigeneer</Option>
                        <Option value="2">双轨</Option>
                        <Option value="3">钥控</Option>
                      </Select>

                    </Col>
                </Row>
                <Row type={"flex"} align={"middle"} >
                    <Col span={11}>
                        <TextArea rows={5}
                            placeholder="密钥"
                            style={{ margin: '24px 0' }}
                            disabled={!this.state.haskey}
                            value={this.state.key}
                            onChange={this.onKeyChange}
                        />
                    </Col>
                    <Col span={2} >

                    </Col>
                    <Col span={11} >

                      <Button type="primary" onClick={this.en}>加密</Button>

                    </Col>
                </Row>
                <Row type={"flex"} align={"middle"} >
                    <Col span={11}>
                        <TextArea
                            rows={5}
                            placeholder="密文"
                            style={{ margin: '24px 0' }}
                            value={this.state.outtext}
                            onChange={this.onOutChange}
                        />
                    </Col>
                    <Col span={2} >

                    </Col>
                    <Col span={11} >

                      <Button type="primary" onClick={this.de}>解密</Button>

                    </Col>
                </Row>
          </Col>
          <Col span={4} />
        </Row>
        </div>
    );
  }
}

export default App;
