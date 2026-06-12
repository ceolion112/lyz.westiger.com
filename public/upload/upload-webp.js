/**
 * WebP 支持补丁 - 在原始上传组件基础上添加 webp 支持
 */
$(function() {
    // 扩展允许的文件类型
    var originalUpload = $.fn.upload;
    
    $.fn.upload = function(options) {
        var result = originalUpload.call(this, options);
        
        // 在上传按钮点击时，修改文件选择器的 accept 属性
        setTimeout(function() {
            var $choose = $(this).find('.ui-upload-choose');
            if ($choose.length > 0) {
                var currentAccept = $choose.attr('accept') || '';
                if (currentAccept && !currentAccept.includes('webp')) {
                    $choose.attr('accept', currentAccept + ',image/webp,.webp');
                }
            }
        }.bind(this), 100);
        
        return result;
    };
    
    // 复制原始方法的属性
    $.fn.upload.defaults = originalUpload.defaults || {};
});
