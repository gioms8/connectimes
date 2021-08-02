import React, { Component } from 'react';

class floatingPopulationList extends Component {

    render(){
        return(
            <>
                <table className='table_ty1 fp_tlist'>
                    <tr>
                        <th>Row</th>
                        <th>일자</th>
                        <th>시간</th>
                        <th>연령대</th>
                        <th>성별</th>
                        <th>시</th>
                        <th>군구</th>
                        <th>유동 인구 수</th>
                    </tr>
                </table>

                <table className='table_ty2 fp_tlist'>
                    <tr>
                        <td>1</td>
                        <td>20191101</td>
                        <td>00</td>
                        <td>40</td>
                        <td>여성</td>
                        <td>서울</td>
                        <td>영등포구</td>
                        <td>32670</td>
                    </tr>
                </table>

                <table className='hidden_type'>
                    <tr>
                        <td>1</td>
                        <td>20191101</td>
                        <td>00</td>
                        <td>50</td>
                        <td>남성</td>
                        <td>서울</td>
                        <td>구로구</td>
                        <td>27888</td>
                    </tr>
                </table>
            </>
        )
    }

}

export default floatingPopulationList;