import https from 'https'

module.exports = (ctx) => {
  const register = () => {
    ctx.helper.uploader.register('lankong', {
      handle,
      name: 'lankong',
      config: config
    })
  }

  const postOptions = (userConfig, fileName, image) => {

    const serverUrl = userConfig.server
    if (serverUrl.endsWith("/")) {
      throw new Error("Server url cannot ends with /")
    }
    const isV2 = userConfig.isV2
    const token = userConfig.token
    const ignoreCertErr = userConfig.ignoreCertErr
    let requestAgent = new https.Agent({
      // 此处需要取反 忽略证书错误 拒绝未授权证书选项
      rejectUnauthorized: !ignoreCertErr
    })

    const v1Headers = {
      'Content-Type': 'multipart/form-data',
      'User-Agent': 'PicGo',
      'Connection': 'keep-alive',
      'token': token || undefined
    }
    const v1FormData = {
      image: {
        value: image,
        options: {
          filename: fileName
        }
      },
      ssl: 'true'
    }

    const v2Headers = {
      'Content-Type': 'multipart/form-data',
      'User-Agent': 'PicGo',
      'Connection': 'keep-alive',
      'Authorization': token || undefined
    }
    const strategyId = userConfig.strategyId
    const v2FormData = {
      file: {
        value: image,
        options: {
          filename: fileName
        }
      },
      ssl: 'true',
      strategy_id: strategyId
    }
    // V2版本情况下，如果用户没有填写策略ID，删除 v2FormData 中的 key: strategy_id
    if (!strategyId) {
      delete v2FormData.strategy_id
    }

    // 如果忽略证书错误开关打开则带上 http agent 访问，否则不需要带（以提高性能）
    if (ignoreCertErr) {
      return {
        method: 'POST',
        url: isV2 ? `${serverUrl}/api/v1/upload` : `${serverUrl}/api/upload`,
        agent: requestAgent,
        headers: isV2 ? v2Headers : v1Headers,
        formData: isV2 ? v2FormData : v1FormData
      }
    }
    else {
      return {
        method: 'POST',
        url: isV2 ? `${serverUrl}/api/v1/upload` : `${serverUrl}/api/upload`,
        headers: isV2 ? v2Headers : v1Headers,
        formData: isV2 ? v2FormData : v1FormData
      }
    }
  }
  const handle = async (ctx) => {
    let userConfig = ctx.getConfig('picBed.lankong')
    if (!userConfig) {
      throw new Error('Can\'t find uploader config')
    }
    const imgList = ctx.output
    for (let i in imgList) {
      let image = imgList[i].buffer
      if (!image && imgList[i].base64Image) {
        image = Buffer.from(imgList[i].base64Image, 'base64')
      }
      const postConfig = postOptions(userConfig, imgList[i].fileName, image)
      let body = await ctx.Request.request(postConfig)

      body = JSON.parse(body)
      let isV2 = userConfig.isV2
      let condition = isV2 ? (body.status === true) : (body.code === 200)

      if (condition) {
        delete imgList[i].base64Image
        delete imgList[i].buffer
        imgList[i]['imgUrl'] = isV2 ? body.data.links.url : body.data.url
      }
      else {
        ctx.emit('notification', {
          title: 'upload failed',
          body: body.message
        })
        throw new Error(body.message)
      }
    }
    return ctx
  }

  const config = ctx => {
    let userConfig = ctx.getConfig('picBed.lankong')
    if (!userConfig) {
      userConfig = {}
    }
    return [
      {
        name: 'isV2',
        type: 'confirm',
        default: userConfig.isV2 || false,
        message: '兰空图床版本 默认 V1 打开时为 V2',
        required: true,
        alias: 'Lsky Pro Version, closed is V1'
      },
      {
        name: 'server',
        type: 'input',
        default: userConfig.server,
        required: true,
        message: '示例: https://example.com',
        alias: 'Server'
      },
      {
        name: 'token',
        type: 'input',
        default: userConfig.token,
        required: true,
        message: '认证 token 信息',
        alias: 'Auth token'
      },
      {
        name: 'strategyId',
        type: 'input',
        default: userConfig.strategyId,
        required: false,
        message: '选填, V1以及V2使用默认存储策略时请留空',
        alias: 'Strategy ID'
      },
      {
        name: 'ignoreCertErr',
        type: 'confirm',
        default: userConfig.ignoreCertErr || false,
        message: '是否忽略证书错误, 如果上传失败提示证书过期请设为true',
        required: true,
        alias: 'Ignore certificate error'
      }
    ]
  }
  return {
    uploader: 'lankong',
    config: config,
    register
  }
}
