<?php

$data = yaml_parse_file ( 'api.yaml' );

function event_cmp ( $a, $b ) {
  return strcmp ( $a['event'], $b['event'] );
}

usort ( $data['from-plugin'], "event_cmp" );

?>
<?php foreach ( $data['from-plugin'] as $call ): ?>
/**
 * <?php echo $call['event']; ?>
 
 *
 * <?php echo $call['desc']; ?>

 */
pm.bind ( '<?php echo $call['event']; ?>', function ( data ) {
<?php
  
  if ( array_key_exists ( 'parameters', $call ) ):
    foreach ( $call['parameters'] as $param => $spec ): ?>
  var <?php echo $param; ?> = data.<?php echo $param; ?>; // <?php echo $spec['type'] . '; ' . $spec['desc']; ?>
  
<?php
    endforeach;
  endif;
  
  echo "\n";
  
  if ( array_key_exists ( 'returns', $call ) ): ?>
  
  return null; // <?php echo $call['returns']['type'] . '; ' . $call['returns']['desc']; ?>
  <?php else: ?>
  
  
  return true; <?php endif; ?>
  
} );

<?php endforeach; ?>