import React from 'react'
import { Form } from 'antd'

const { Item } = Form

/* export type CustomFormItemProps = FormItemProps & {
  ref?: React.MutableRefObject<FormItemProps>
} */

/* export const CustomFormItemContext = (
  null
) */

const CustomFormItem = ({
  colon = true,
  hasFeedback = false,
  labelAlign = 'right',
  noStyle = false,
  required = false,
  trigger = 'onChange',
  validateFirst = false,
  validateTrigger = 'onChange',
  valuePropName = 'value',
  ...props
}) => {
  const checkRequiredRule = () =>
    props.rules
      ? !!props.rules?.find((value) => value['required'])
      : undefined

  return (
/*     <CustomFormItemContext.Provider value={{ ...props }}>
 */      <Item
        colon={colon}
        hasFeedback={hasFeedback}
        labelAlign={labelAlign}
        noStyle={noStyle}
        style={{ margin: 0, padding: 0 }}
        required={checkRequiredRule() || required}
        trigger={trigger}
        validateFirst={validateFirst}
        validateTrigger={validateTrigger}
        valuePropName={valuePropName}
        {...props}
      >
        {props.children}
      </Item>
/*     </CustomFormItemContext.Provider>
 */  )
}

export default CustomFormItem