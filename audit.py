import json, pathlib, statistics, math, openpyxl
root=pathlib.Path(__file__).parent
result={}
for name in ['Tallsådd','Längder']:
    ws=openpyxl.load_workbook(root/(name+'.xlsx'),data_only=True).active
    rows=[list(r) for r in ws.values if r[0] is not None]
    result[name]=rows
    print(name,ws.title,len(rows)-1,'rows, headers:',rows[0])
    x=[r[0] for r in rows[1:]]
    print('mean / variance / sd:',statistics.mean(x),statistics.variance(x),statistics.stdev(x))
    if name=='Längder':
        y=[r[2] for r in rows[1:]]
        slope,intercept=statistics.linear_regression(x,y)
        print('slope / intercept / r2:',slope,intercept,statistics.correlation(x,y)**2)
        print('t:',(statistics.mean(x)-175)/(statistics.stdev(x)/math.sqrt(len(x))))
        print('tall count:',sum(v>175 for v in x))
(root/'source-data.json').write_text(json.dumps(result,ensure_ascii=False),encoding='utf8')
