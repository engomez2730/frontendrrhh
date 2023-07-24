import { UploadOutlined } from '@ant-design/icons'
import {  Image, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomRow from './CustomRow'
import CustomCol from './CustomCol'
import CustomButton from './CustomButton'
import CustomModal from './CustomModal'
import CustomFormItem from './CustomForItem'
import ImgCrop from 'antd-img-crop'


const CustomUpload= ({
  action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  buttonType = 'link',
  deleteImage = true,
  form,
  imageCrop = false,
  imageCropProps,
  itemName,
  itemProps,
  label = 'Cedula',
  listType = 'picture-card',
  multipleFiles = false,
  name = '',
  onlyImages = true,
  previewTitle,
  required = false,
  readonly = false,
  ...props
}) => {
  const [fileList, setFileList] = useState()

  useEffect(() => {
    const Url = form.getFieldValue(name)

    if (Url !== undefined) {
      if (typeof Url === 'string') {
        const file = {
          uid: '-1',
          name: name,
          status: 'done',
          url: Url,
        }
        form.setFieldsValue({ [name]: Url })
        setFileList([file])
      } else {
        const file = {
          uid: '-1',
          name: name,
          status: 'done',
          url: Url?.file?.url,
        }
        form.setFieldsValue({ [name]: Url?.file?.url })
        setFileList([file])
      }
    } else {
      setFileList([])
    }
  }, [form.getFieldValue(name)])

  const [preview, setPreview] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  })

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handlePreview = async (file) => {
    if (onlyImages) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      setPreview({
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle:
          file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
      })
    } else {
      if (file?.url) {
        const pdfWindow = window.open('')
        pdfWindow?.document.write(
          ` 
            <iframe width='100%' height='100%' src="${file.url}"></iframe>
          `
        )
      }
    }
  }

  const itemRender = {
    itemRender: onlyImages
      ? (e, image) => {
          if (!onlyImages) {
            return null
          }
          image.name = image?.originFileObj?.name
          return (
            <CustomRow>
              <CustomCol xs={24}>{e}</CustomCol>
            </CustomRow>
          )
        }
      : undefined,
  }

  const handleChange = async (fileLists) => {
    let [file] = fileLists
    file = file === undefined ? {} : file
    if (!file?.url && !file?.preview) {
      file.preview = file?.originFileObj
        ? await getBase64(file?.originFileObj)
        : ''
      file.url = (await file?.originFileObj)
        ? await getBase64(file?.originFileObj)
        : ''
    }

    const newFile = {
      uid: '-1',
      name: name,
      status: 'done',
      url: file?.url,
    }
    file?.originFileObj ? setFileList([newFile]) : setFileList([newFile])
  }

  const handleOnChange = (e) => {
    if (e.fileList?.length) {
      if (multipleFiles) {
        handleChange(e.fileList)
      } else {
        handleChange([e.fileList[e.fileList?.length - 1]])
      }
    } else {
      handleChange([])
      form.resetFields([`${name}`])
    }
  }

  const dummyRequest = (options) => {
    setTimeout(() => {
      options.onSuccess('ok')
    }, 0)
  }

  const handleOnRemove = () => {
    if (deleteImage) {
      setFileList([])
    }
    return deleteImage
  }

  const commonProps = {
    accept: 'image/*',
    customRequest: dummyRequest,
    fileList: fileList,
    action: action,
    listType: listType,
    className: onlyImages ? 'upload-list-inline' : '',
    onPreview: handlePreview,
    ...itemRender,
    ...props,
    onRemove: readonly ? null : handleOnRemove,
    readonly: readonly,
    deleteImage: !readonly,
  }

  return (
    <>
      <CustomFormItem
        label={label}
        name={itemName ?? name}
        rules={[{ required: required }]}
        labelCol={props.labelCol}
        {...itemProps}
        {...(props.labelCol === undefined)}
      >
        {imageCrop ? (
          <ImgCrop
            modalTitle={'Editar imagen'}
            rotate
            shape={'round'}
            onModalOk={async (file) => {
              const img = await getBase64(file)
              form.setFields([
                {
                  name: `${name}`,
                  value: img,
                  errors: undefined,
                  validating: true,
                },
              ])
              handleChange([
                { url: img, uid: '-1', name: (file)?.name },
              ])
            }}
            {...imageCropProps}
          >
            <Upload {...commonProps}>
              {fileList?.length >= 1 ? null : (
                <CustomButton
                  showAlways
                  type={buttonType}
                  icon={<UploadOutlined />}
                >
                  Cargar {props.children}
                </CustomButton>
              )}
            </Upload>
          </ImgCrop>
        ) : (
          <Upload
            onChange={handleOnChange}
            {...commonProps}
            disabled={readonly}
          >
            {fileList?.length >= 1 ? null : (
              <CustomButton
                showAlways
                type={buttonType}
                icon={<UploadOutlined />}
              >
                Cargar {props.children}
              </CustomButton>
            )}
          </Upload>
        )}
      </CustomFormItem>

      <CustomModal
        title={previewTitle || preview.previewTitle}
        open={preview.previewVisible}
        onCancel={() => setPreview({ ...preview, previewVisible: false })}
        footer={false}
      >
        <CustomRow justify={'center'}>
          <Image src={preview.previewImage} />
        </CustomRow>
      </CustomModal>
    </>
  )
}

export default CustomUpload