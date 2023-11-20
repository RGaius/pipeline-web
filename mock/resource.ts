export default {
  'GET /api/resource': (req: Request, res: Response) => {
    // mock资源列表数据
    const list = []
    for (let i = 0; i < 10; i++) {
      list.push({
        id: i,
        name: `name${i}`,
        description: `description${i}`,
        type: `type${i}`,
        url: `url${i}`,
        size: `size${i}`,
        createTime: `createTime${i}`,
        updateTime: `updateTime${i}`,
      })
    }
    res.json({data: list, success: true})
  }
}