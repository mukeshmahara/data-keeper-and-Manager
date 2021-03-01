$("#add_user").submit(function (event) {
  swal({
    title: "Good job!",
    text: "User saved successfully!",
    icon: "success",
    button: "done!",
  });
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  console.log(data);

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };
  $.ajax(request).done(function (response) {
    swal({
      title: "Good job!",
      text: "User information update successfully!",
      icon: "success",
      button: "done",
    });
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    $.ajax(request).done(function (response) {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this user information!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! user information has been deleted!", {
            icon: "success",
          });
        } else {
          swal("operation cancelled!!");
        }
      });
    });
  });
}
