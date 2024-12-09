window.chartColors = {
    red: "#FF0000",
    blue: "#0000FF"
  };
  
  var color = Chart.helpers.color;
  
  const text2 =('https://www.kogures.com/hitoshi/javascript/chartjs/scale.html', 
        'https://teratail.com/questions/54831', 
        'https://www.kogures.com/hitoshi/javascript/chartjs/scale.html'
  );

  var scatter_data = {
    datasets:[{

      //ラベルをテキストにする
      label: ["D1Mit66(Vic) 13.4 Mb" , "D1Mit372(Ned) 21.3 Mb" , "D1Mit20(Pet) 32 Mb" , "D1Mit18(Pet) 52.5 Mb" , "D1Mit24(Pet) 74.5 Mb" , "D1Mit7(Fam) 75 Mb" , "D1Mit132(Vic) 77.1 Mb" , "D1Mit134(Pet) 80.2 Mb" , "D1Mit10(Fam) 90.6 Mb" , "D1Mit11(Vic) 98.5 Mb" , "D1Mit26(Vic) 112 Mb" , "D1Mit191(Ned) 120.1 Mb" , "D1Mit495(Fam) 127.6 Mb" , "D1Mit102(Fam) 147.1 Mb" , "D1Mit14(Vic) 156.6 Mb" , "D1Mit159(Vic) 159.5 Mb" , "D1Mit159(Fam) 159.5 Mb" , "D1Mit108(Ned) 164.1 Mb" , "fcgr2b(Vic) 170.8 Mb" , "D1Mit149(Fam) 172.5 Mb" , "D1Mit166(Vic) 176.3 Mb" , "D1Mit223(Pet) 188.4 Mb" , "D1Mit292(Ned) 191.1 Mb" , "D1Mit155(Fam) 194.1 Mb"],

      borderColor: window.chartColors.blue,

      //backgroundColor: color(window.chartColors.red).alpha(0.4).rgbString(),

      //変更
      backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),

      //変更
      borderWidth: 5,

      //不要 pointRadius: 10,
      data: [{
        x: 13.4,
        y: 0,
      },{
        x: 21.3,
        y: 0,
      },{
        x: 32,
        y: 0,
      },{
        x: 52.5,
        y: 0,
      },{
        x: 74.5,
        y: 0,
      },{
        x: 75,
        y: 0,
      },{
        x: 77.1,
        y: 0,
      },{
        x: 80.2,
        y: 0,
      },{
        x: 90.6,
        y: 0,
      },{
        x: 98.5,
        y: 0,
      },{
        x: 112,
        y: 0,
      },{
        x: 120.1,
        y: 0,
      },{
        x: 127.6,
        y: 0,
      },{
        x: 147.1,
        y: 0,
      },{
        x: 156.6,
        y: 0,
      },{
        x: 159.5,
        y: 0,
      },{
        x: 164.1,
        y: 0,
      },{
        x: 170.8,
        y: 0,
      },{
        x: 172.5,
        y: 0,
      },{
        x: 176.3,
        y: 0,
      },{
        x: 188.4,
        y: 0,
      },{
        x: 191.1,
        y: 0,
      },{
        x: 194.1,
        y: 0,
      },],
    
    //以下、aタグの情報

    metadata: [ //メタデータ．ここに情報(URL)を設定する
        'https://www.kogures.com/hitoshi/javascript/chartjs/scale.html', 
        'https://teratail.com/questions/54831', 
        'https://www.kogures.com/hitoshi/javascript/chartjs/scale.html'
      ], 
    
    }]
  };
  
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myScatter = Chart.Scatter(ctx, {
    data: scatter_data,
    options:{
      legend: {
        display: false,
      },

      //グラフタイトルはフォントサイズが変えれないため設定削除
      /*
      title: {        
        display: true,
        text: "Mouse Chromosome1",
      },
      */

      //追記：クリック時にツールチップ表示
      events: ['click'],

      //canvasサイズ自動設定機能を使わない。HTMLで指定したサイズに固定
      responsive: false,
      //responsive: true,

      scales: {
        xAxes: [{
            display: true,
            stacked: false,
            scaleLabel: {   // 軸ラベル
              display: true,          // 表示設定
              labelString: '(Mb)',    // ラベル
              fontColor: "blue",      // 文字の色
              fontSize: 24,
            },
            gridLines: {
              display: false
            },
            ticks:{
              //max:1でy=0固定
              max:200,
              min:0,
              fontSize:28,
            }
          }],

          yAxes: [{
            //Y軸を非表示
            display:false,
            gridLines: {
              drawBorder: false
            },
            ticks:{
                //max:1でy=0固定
                max:1,
                min:0,
            }
        }]
      }
      
      ,

      tooltips: {
        enabled: false, // キャンバスのツールチップを無効化
        custom: function(tooltipModel) {
            // ツールチップ要素
            var tooltipEl = document.getElementById('chartjs-tooltip');

            // 最初の表示時に要素を生成。
            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                
                tooltipEl.innerHTML = "<table style=''></table>"
                //tooltipEl.innerHTML = "<table style=''></table>"

                this._chart.canvas.parentNode.appendChild(tooltipEl);
            }

            // ツールチップが無ければ非表示。
            if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            // キャレット位置をセット。
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
                return bodyItem.lines;
            }

            // メタデータ(画像のURL)の取得.
            var index = tooltipModel.dataPoints[0].index;
            var metadata = this._chart.data.datasets[0].metadata[index];
            var label = this._chart.data.datasets[0].label[index];

            // テキストをセット。
            if (tooltipModel.body) {
                var titleLines = tooltipModel.title || [];
                var bodyLines = tooltipModel.body.map(getBody);

                var innerHtml = '<thead>';

                titleLines.forEach(function(title) {
                   innerHtml += `<tr><th> ${title} </th></tr>`;
                });
                innerHtml += '</thead><tbody>';

                bodyLines.forEach(function(body, i) {
                    var colors = tooltipModel.labelColors[i];
                    
                    //window.chartColors.red,

                    var span = `<p class="chartjs-tooltip-key" style="font-size:16pt;">`;
                   
                    //innerHtml += `<tr><td> ${span} <span> ${body} </span><br><img style="width:5em;" src= ${metadata} ></td></tr>`;
                    //↑上記innerHTMLを下記に変更
                    innerHtml += `<tr><td> ${span} <a href = ${metadata}>${label}</a></p></td></tr>`;

                });
                innerHtml += '</tbody>';

                var tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
            }
            // `this`はツールチップ全体です。
            var positionY = this._chart.canvas.offsetTop + 100;
            var positionX = this._chart.canvas.offsetLeft;

            // 表示、位置、フォントスタイル指定します。
            tooltipEl.style.opacity = 1;
            
            // ツールチップのx位置
            tooltipEl.style.left = positionX + tooltipModel.caretX + 'px';

            // ツールチップのy位置
            tooltipEl.style.top = positionY + tooltipModel.caretY + 'px';
            tooltipEl.style.fontFamily = tooltipModel._fontFamily;
            tooltipEl.style.fontSize = tooltipModel.fontSize;
            tooltipEl.style.fontStyle = tooltipModel._fontStyle;
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        }
    }
    }
  });  