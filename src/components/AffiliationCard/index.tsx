import React, { FC } from 'react'
import { Col, Row } from 'reactstrap'
import styles from './styles.module.scss'
interface AffiliationCardProps {
  data
}
const AffiliationCard: FC<AffiliationCardProps> = (props: AffiliationCardProps) => {
  const { data } = props

  const details = [
    { label: 'Affiliations', value: false },
    { label: 'Associated With LORA Advisors?', value: true },
    { label: 'Name of Affiiliated Person', value: null },
  ]
  return (
    <div className={styles.affiliation_card}>
      <h4 className='mb-4'>Affiliations</h4>
      {details.map((item, i) => (
        <Row key={i} className='mb-3'>
          <Col xs='2'>
            <p className={styles.label}>{item.label}</p>
          </Col>
          <Col xs='10'>
            <p className={styles.value}>{item.value === true ? 'Yes' : item.value === null ? 'None' : 'No'}</p>
          </Col>
        </Row>
      ))}
    </div>
  )
}

export default AffiliationCard