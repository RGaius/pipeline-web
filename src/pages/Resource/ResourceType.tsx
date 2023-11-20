import {CheckCard,} from '@ant-design/pro-components';

export default (props: any, ref: any) => {
  const {datasource, onChange} = props
  console.log("datasource:", datasource)

  return (
      <>
        <CheckCard.Group onChange={onChange}>
          {
            datasource.map(item => {
              return <><CheckCard key={item.name} title={item.name} description={item.desc} value={item.code}/> </>
            })
          }
        </CheckCard.Group>
      </>
  );
};