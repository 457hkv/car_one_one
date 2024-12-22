// 订单状态
export enum orderState {
  pending = 1,
  doing = 2,
  finished = 3,
  // Pending = "等待商家接单", // 待处理
  // AwaitingPayment = "等待用户付款", // 待处理
  // Refunding = "发起退款", // 待处理
  // AwaitingAssignInstaller = "等待分配安装人员", // 进行中
  // AwaitingInstallation = "等待安装", // 进行中
  // RequestRefund = "发起退款", // 进行中
  // Completed = "已完成", // 已完成
  // Cancelled = "已取消", // 已完成
  // Refunded = "已退款", // 已完成
}
