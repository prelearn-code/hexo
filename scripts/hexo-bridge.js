const path = require('path');
const fs = require('fs');

// 1. Copy images from _posts/pic to public/pic during generation
hexo.extend.filter.register('before_generate', function() {
  const sourcePicDir = path.join(hexo.source_dir, '_posts/pic');
  const publicPicDir = path.join(hexo.public_dir, 'pic');

  if (fs.existsSync(sourcePicDir)) {
    // We can't easily hook into the copy logic here without a plugin, 
    // but we can register a generator to handle it.
  }
});

hexo.extend.generator.register('blog-pics', function(locals) {
  const sourcePicDir = path.join(hexo.source_dir, '_posts/pic');
  if (!fs.existsSync(sourcePicDir)) return;

  const files = fs.readdirSync(sourcePicDir);
  return files.map(file => {
    return {
      path: 'pic/' + file,
      data: function() {
        return fs.createReadStream(path.join(sourcePicDir, file));
      }
    };
  });
});

// 2. Filter image paths in markdown and remove branding
hexo.extend.filter.register('after_post_render', function(data) {
  // Replace relative paths like ../../pic/ with absolute /pic/
  data.content = data.content.replace(/src="[^"]*?pic\/(.*?)"/g, 'src="/pic/$1"');
  return data;
});

// 3. Inject script to silence console logo and remove meta generator
hexo.extend.filter.register('after_render:html', function(html, data) {
  // Remove meta generator if it still exists
  html = html.replace(/<meta name="generator" content="Hexo.*?>/g, '');
  
  // Inject script to override Fluid.events.billboard
  const silenceScript = '<script>if(window.Fluid && window.Fluid.events) { window.Fluid.events.billboard = function() {} }</script>';
  return html.replace('</body>', silenceScript + '</body>');
});

