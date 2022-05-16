function myBind(func, context) {
  return function() {
    func.apply(context, arguments);
  };
}